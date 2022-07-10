import axios from 'axios'

interface Offer {
    id: number
    affiliateUrl: string
    isActive: boolean
    merchant: string
    price: {
        usd: {
            bestCoupon: {
                code: string
                discountValue: string
                discountStrategy: string
                isCashback: boolean
            } | null
            currency: string
            price: number
            priceWithoutCoupon: number
        }
    }
    edition: string
    region: string
    stock: string
    platform: string
}

interface Merchant {
    id: string
    name: string
    aggregateRating: {
        value: number
        count: number
    }
    types: string
    paymentMethods: string[]
    logoSlug: string
    reviewUrl: string
}

interface Edition {
    id: string
    name: string
}

interface Region {
    id: string
    name: string
    filterName: string
}

interface ProductRes {
    success: boolean
    offers: Offer[]
    merchants: { [key: string]: Merchant }
    editions: { [key: string]: Edition }
    regions: { [key: string]: Region }
}

async function getProductFromCDG(productId: number | string): Promise<ProductRes> {
    const { data } = await axios.get(`https://cheapdigitaldownload.com/wp-admin/admin-ajax.php?action=get_offers&product=${productId}&currency=usd`)
    return data
}

async function getProductFromAKS(productId: number | string): Promise<ProductRes> {
    const { data } = await axios.get(`https://www.allkeyshop.com/blog/wp-admin/admin-ajax.php?action=get_offers&product=${productId}&currency=eur`)
    return data
}

export default async function getProduct(productId: number | string): Promise<ProductRes> {
    const [ aks, cdg ] = await Promise.all([getProductFromAKS(productId), getProductFromCDG(productId)])
    return {
        success: aks.success && cdg.success,
        offers: aks.offers.concat(cdg.offers),
        merchants: {...cdg.merchants, ...aks.merchants},
        editions: {...cdg.editions, ...aks.editions},
        regions: {...cdg.regions, ...aks.regions},
    }
}