import { getProduct } from '../src'

const STEAM_PRODUCT_ID = 28973

jest.setTimeout(20000)

test('getProduct should return valid data for valid productId', async () => {
    const res = await getProduct(STEAM_PRODUCT_ID)
    expect(res.success).toBe(true)
    expect(res.offers.length).toBeGreaterThan(0)
    const offer = res.offers[0]
    const currency = "eur"
    const price = offer.price[currency]
    expect(price).toBeDefined()
    expect(typeof price.price).toBe("number")
    expect(typeof price.priceWithoutCoupon).toBe("number")
    expect(typeof offer.merchant).toBe("string")
    const merchant = res.merchants[offer.merchant]
    expect(merchant).toBeDefined()
    expect(merchant.id).toBe(offer.merchant)
    expect(merchant.name.length).toBeGreaterThan(0)
    expect(typeof offer.edition).toBe("string")
    const edition = res.editions[offer.edition]
    expect(edition).toBeDefined()
    expect(edition.id).toBe(offer.edition)
    expect(edition.name).toMatch(/\w\.? \d+ \w/)
    expect(typeof offer.region).toBe("string")
    const region = res.regions[offer.region]
    expect(region).toBeDefined()
    expect(region.id).toBe(offer.region)
    expect(typeof region.name).toBe("string")
    expect(typeof region.filterName).toBe("string")
});