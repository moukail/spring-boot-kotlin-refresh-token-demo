#!/usr/bin/env bash

npm create vite@latest frontend -- --template react-ts <<< 'y'

npm install @mui/material @mui/icons-material @emotion/react @emotion/styled @mui/x-data-grid
npm install react-router-dom
npm install axios @tanstack/react-query
npm install @mui/x-date-pickers dayjs
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
#npm i --save-dev jest ts-node ts-jest @types/jest jest-environment-jsdom
chmod -R a+rw frontend

rsync -a frontend/ ./
rm -rf frontend