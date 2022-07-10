import axios from "axios";
import * as cheerio from "cheerio"

interface GiftCardProduct {
    link: string
    imageUrl: string
    title: string
    productId: string
}

async function scrapeSinglePage(url: string): Promise<GiftCardProduct[]> {
    const { data } = await axios.get(url)
    const $ = cheerio.load(data, null, false)
    const searchResults = $('.search-results')
    return searchResults.children().map(function() {
        const linkNode = $(".search-results-row-link", this)
        const imageNode = $(".search-results-row-image", this)
        const titleNode = $(".search-results-row-game-title", this)
        const metacriticNode = $(".metacritic", this)
        return {
            link: linkNode.attr("href") || "",
            imageUrl: (imageNode.children().first().attr("style")?.match(/background-image: url\((.*)\)/)||[""])[1],
            title: titleNode.text(),
            productId: metacriticNode.children().first().attr("data-product-id") || "",
        }
    }).get()
}

async function getGiftCardProductsFromAKS(): Promise<GiftCardProduct[]> {
    const pages = ['https://www.allkeyshop.com/blog/catalogue/category-giftcards/', 'https://www.allkeyshop.com/blog/catalogue/category-giftcards/page-2/', 'https://www.allkeyshop.com/blog/catalogue/category-giftcards/page-3/', 'https://www.allkeyshop.com/blog/catalogue/category-giftcards/page-4/']
    const scrapedPages = await Promise.all(pages.map(scrapeSinglePage))
    return scrapedPages.flat()
}

async function getGiftCardProductsFromCDG(): Promise<GiftCardProduct[]> {
    const pages = ['https://cheapdigitaldownload.com/catalog/category-giftcards/', 'https://cheapdigitaldownload.com/catalog/category-giftcards/page-2/']
    const scrapedPages = await Promise.all(pages.map(scrapeSinglePage))
    return scrapedPages.flat()
}

export default async function getGiftCardProducts(): Promise<GiftCardProduct[]> {
    const [ aks, cdg ] = await Promise.all([getGiftCardProductsFromAKS(), getGiftCardProductsFromCDG()])
    for (const product of cdg) {
        if (!aks.find((product2) => product2.productId === product.productId)) {
            aks.push(product)
        }
    }
    return aks
}