import { getGiftCardProducts, getProduct } from '../src'
import * as validUrl from "valid-url"

jest.setTimeout(20000)

test('getGiftCardProducts should return valid data', async () => {
    const res = await getGiftCardProducts()
    console.log(res)
    expect(res.length).toBeGreaterThan(0)
    const product = res[0]
    expect(validUrl.isUri(product.imageUrl)).toBeTruthy()
    expect(validUrl.isUri(product.link)).toBeTruthy()
    expect(product.productId.length).toBeGreaterThan(0)
    expect(product.title.length).toBeGreaterThan(0)
});