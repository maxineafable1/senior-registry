## stack

1. next.js\
2. typescript
3. sqlite

### dependencies

1. react-hook-form - client form builder/helper
2. zod - client form validation
3. shadcn-ui - frontend components
4. drizzle - orm for sqlite

## instruction

1. check node version `node -v` - recommend v20+
2. check npm version `npm -v` - 11.3.0
3. `npm i` or `npm install`
4. `npm run dev`
5. click `localhost:3000`

## database

sqlite.db

### to reset database

1. delete sqlite.db file
2. run command `npx drizzle-kit push`
3. go to file app/(auth)/register/page.tsx
4. comment code from line 8 to 12, then save
6. run app `npm run dev`
7. go to `localhost:3000/register`
8. register username `admin` or any, password 8 chars min, and select role `admin`
9. uncomment code from line 8 to 12, then save
10. ok na ty

###### initial admin account:
username: admin\
password: 11111111 - 8 chars

###### tables:
users\
seniors