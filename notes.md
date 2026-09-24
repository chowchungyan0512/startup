# CS 260 Notes

I love web programming

This file represents what I have learned about web programming.

- [My startup](https://startup.campusconnect.click)
- [My simon](https://simon.campusconnect.click)

## Helpful links

- [Course instruction](https://github.com/webprogramming260)
- [Canvas](https://byu.instructure.com)
- [MDN](https://developer.mozilla.org)

## AWS

Rented an EC2 instance and leased campusconnect.click. Caddy on the server reverse-proxies subdomains to different local ports/services (startup.campusconnect.click, simon.campusconnect.click), so each deliverable/app gets its own subdomain without a separate server.

## HTML

Learned to structure pages with proper semantic elements (header, nav, main, section, article, footer) and to keep heading levels properly nested (h1 > h2 > h3) instead of skipping levels for style reasons. Also learned forms that submit real data should use method="post" instead of "get" so values aren't appended to the URL.

## CSS

Reviewed and deployed the course's Simon CSS example to simon.campusconnect.click. Compared it against my own CampusConnect styling — both use Bootstrap as a base framework layered with custom CSS (colors, fonts, spacing) rather than relying on Bootstrap defaults alone. Reinforced the value of CSS custom properties (`:root` variables) for keeping a consistent color system across many pages instead of repeating hex values.

## React

Interesting things I have learned about React
