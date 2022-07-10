# node-allkeyshop

Node.js scraper for [allkeyshop](https://www.allkeyshop.com) and [cheapdigitaldownload](https://cheapdigitaldownload.com/)

### Installation

```ts
npm install allkeyshop
```

### Usage

```ts
const allkeyshop = require('allkeyshop')

allkeyshop.getGiftCardProducts().then(console.log)
// [{
//     link: 'https://cheapdigitaldownload.com/steam-gift-card-digital-download-price-comparison/',
//     imageUrl: 'https://cheapdigitaldownload.com/img/buy-steam-gift-card-cd-key-pc-download-catalog.jpg',
//     title: 'Steam Gift Card',
//     productId: '28973'
// },
// ...
allkeyshop.getProduct(28973).then(console.log)
// {
//   "success": true,
//   "offers": [
//     {
//       "id": 1504465,
//       "affiliateUrl": "https://royalcdkeys.com/products/steam-gift-card-6000-idr-id-prepaid-cd-key?variant=40509611540617",
//       "isActive": true,
//       "merchant": "321",
//       "price": {
//         "usd": {
//           "bestCoupon": {
//             "code": "-10%: AKS10off ",
//             "discountValue": "10.00",
//             "discountStrategy": "%",
//             "isCashback": false
//           },
//           "currency": "eur",
//           "price": 0.67,
//           "priceWithoutCoupon": 0.74
//         }
//       },
//       "edition": "1518",
//       "region": "371",
//       "stock": "InStock",
//       "platform": "game-code"
//     },
// ...
```

## License

This project is licensed under the MIT License.