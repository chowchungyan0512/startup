while getopts k:h:s: flag
do
    case "${flag}" in
        k) key=${OPTARG};;
        h) hostname=${OPTARG};;
        s) service=${OPTARG};;
    esac
done

if [[ -z "$key" || -z "$hostname" || -z "$service" ]]; then
    printf "\nMissing required parameter.\n"
    printf "  syntax: deployService.sh -k <pem key file> -h <hostname> -s <service>\n\n"
    exit 1
fi

printf "\n----> Deploying service $service to $hostname with $key\n"

# Step 1
printf "\n----> Build the distribution package\n"
rm -rf build
mkdir build
npm install # make sure vite is installed so that we can bundle
npm run build # build the React front end
cp -rf dist build/public # move the React front end to the target distribution

# Copy every file/folder in service/ except node_modules (that gets
# installed fresh on the target instead of uploaded).
for item in service/*; do
    name=$(basename "$item")
    if [ "$name" != "node_modules" ]; then
        cp -r "$item" build/
    fi
done

# Step 2
printf "\n----> Clearing out previous distribution on the target\n"
ssh -i "$key" ubuntu@$hostname << ENDSSH
rm -rf services/${service}
mkdir -p services/${service}
ENDSSH

# Step 3
printf "\n----> Copy the distribution package to the target\n"
scp -r -i "$key" build/* ubuntu@$hostname:services/$service

# Step 4
printf "\n----> Deploy the service on the target\n"
ssh -i "$key" ubuntu@$hostname << ENDSSH
bash -i
cd services/${service}
npm install
pm2 restart ${service}
ENDSSH

# Step 5
printf "\n----> Removing local copy of the distribution package\n"
rm -rf build
rm -rf dist
