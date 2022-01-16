# build stage
FROM node:lts-alpine as build-stage
# 创建一个工作目录
WORKDIR /app
COPY . .
RUN yarn install --registry=https://registry.npm.taobao.org
RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]