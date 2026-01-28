import {defineConfig} from 'orval';

export default defineConfig({
  dada: {
    input: 'http://localhost:8080/v3/api-docs', // 백엔드 Swagger JSON 주소
    output: {
      mode: 'tags-split', // API 태그별로 파일 분리
      target: './src/api/generated/dada.ts', // 생성될 파일 위치
      schemas: './src/api/generated/model', // 타입(인터페이스) 정의 위치
      client: 'react-query', // 핵심: 리액트 쿼리 훅 생성
      httpClient: 'axios',
      prettier: true,
      override: {
        mutator: {
          path: './src/api/axios-instance.ts', // 커스텀 Axios 인스턴스 사용
          name: 'customInstance',
        },
        query: {
          useQuery: true
        }
      },
    },
  },
});