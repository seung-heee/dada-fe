# 1. 빌드단계(build)

# Node.js 이미지를 기반으로 React 앱을 빌드
FROM node:20-alpine AS builder

# 작업 디렉토리 설정
WORKDIR /app

# 의존성 설치를 위해 package.json과 lock 파일을 복사
COPY package.json package-ylock.json ./

# 패키지 설치
RUN npm install

# 소스코드 전체 복사
COPY . .

# React 앱 빌드 실행
RUN npm run build

# 2단계 실행 단계(serve)

# nginx 이미지를 사용해 빌드된 파일만 서빙
FROM nginx:alpine

# Nginx 기본 설정을 싹 지우고 SPA 전용 설정을 새로 만듭니다.
RUN rm /etc/nginx/conf.d/default.conf
RUN echo 'server { \
    listen 80; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html index.htm; \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

# 빌드 결과물(dist) 복사
COPY --from=builder /app/dist /usr/share/nginx/html

# 80번 포트 노출(Nginx 기본 포트)
EXPOSE 80

# Nginx 실행(daemon off 포그라운드 실행)
CMD ["nginx", "-g", "daemon off;"]