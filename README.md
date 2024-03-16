# React + TypeScript + Vite

Project created with UI plus functions as filters, pagination and sorting.
Using technologies: React, React Query, TailwindCSS e shadcn/ui

To install tailwind dependence:
=> pnpm install -D tailwindcss postcss autoprefixer

After, to initialize the tailwind.config.js file:
=> pnpm dlx tailwindcss init -p
PS: We use tag "-p" to create a create postcss.config.js file, because for tailwind works with vite is obligate has this file.

To execute:
=> pnpm run dev

To Icons we use Lucide:
=> pnpm i lucide-react
Link: https://lucide.dev/icons/

Some components use dependencies, to install:
=> pnpm i tailwind-variants tailwind-merge

To Select Component install:
=> pnpm i @radix-ui/react-select

To Pagination use: React Router DOM
=> pnpm i react-router-dom localforage match-sorter sort-by

After create a server.json file with fake data, to instal json server:
=> pnpm i json-server -D
And now create a script to execute the server in the package.json > "scripts" :
=> "server": "json-server server.json --watch --port 3333"
-Syntax "<scriptName> <filePath> < --watch is to observe all the time > < --port is to set a port to execute >"
Finally to execute the server:
=> pnpm run server

To manipulate the pagination at url directly put:

<!-- ?_page=1&_per_page=5 -->
<!-- => http://localhost:3333/tags?_page=1&_per_page=5 -->

It was commented because it add a invert bar in the middle of the url like this: page=1&\_per_page=25

To consume API use ReactQuery, to install:
=> pnpm i @tanstack/react-query
