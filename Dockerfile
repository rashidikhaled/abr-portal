FROM def.karestanjavan.ir/node:22-alpine as build
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install
COPY . .
RUN npm run build

FROM def.karestanjavan.ir/nginx:1.20-alpine as production-stage
COPY --from=build /app/dist /usr/share/nginx/html
COPY mykarestancert.pem /usr/local/share/ca-certificates/mykarestancert.crt
WORKDIR /usr/share/nginx/html
COPY --from=build /app/tag.txt .
ENV TZ=Asia/Tehran
EXPOSE 80
RUN update-ca-certificates
CMD ["nginx", "-g", "daemon off;"]