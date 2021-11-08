This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Cấu hình thông tin của app trong file next.config.js, gồm các thông tin: apiKey, secretKey, redirectUrl, scopes

Start the development server:

```bash
npm run dev
# or
yarn dev
```

Bật insecure-localhost trong chrome
```
chrome://flags/#allow-insecure-localhost
```

Vào địa chỉ và điền domain store để cài đặt app
```
http://localhost:3001/install
```

## Một số thành phần cơ bản

- `pages/install`: Chạy ở server side, xử lý handler redirect khi cài app, lấy access token và redirect về embedded view
    - AccessToken được tạo ra để sử dụng cho server call server -> không expose thông tin sapo access token xuống client side.   
    Nếu từ client side muốn lấy thông tin của Sapo thì cần gọi Api về server-side của app, sau đó từ server của app gọi tiếp sang Sapo dùng AccessToken
    - JWT sinh ra để xác thực phiên làm việc của embedded app, có thể dùng để làm xác thực để call API từ client-side đến server-side của app
- `page/embedded/*`: chạy ở client side, sử dụng embeddedSDK để hiển thị embedded trong admin của Sapo
