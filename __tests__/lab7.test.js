describe("Basic user flow for Website", () => {
  beforeAll(async () => {
    await page.goto("https://cse110-sp25.github.io/CSE110-Shop/");
  });

  it("Initial Home Page - Check for 20 product items", async () => {
    const numProducts = await page.$$eval(
      "product-item",
      (prodItems) => prodItems.length
    );
    expect(numProducts).toBe(20);
  });

  it("Make sure <product-item> elements are populated", async () => {
    const prodItemsData = await page.$$eval("product-item", (prodItems) => {
      return prodItems.map((item) => {
        const data = item.data;
        return {
          title: data.title,
          price: data.price,
          image: data.image,
        };
      });
    });

    for (const item of prodItemsData) {
      expect(item.title).toBeTruthy();
      expect(item.price).toBeTruthy();
      expect(item.image).toBeTruthy();
    }
  }, 10000);

  it('Clicking the "Add to Cart" button should change button text', async () => {
    const product = await page.$("product-item");
    const shadowRoot = await product.getProperty("shadowRoot");
    const button = await shadowRoot.$("button");
    await button.click();
    const innerText = await (await button.getProperty("innerText")).jsonValue();
    expect(innerText).toBe("Remove from Cart");
  }, 5000);

  it("Checking number of items in cart on screen", async () => {
    await page.reload(); // fresh state
    const prodItems = await page.$$("product-item");

    for (const item of prodItems) {
      const shadowRoot = await item.getProperty("shadowRoot");
      const button = await shadowRoot.$("button");
      const text = await (await button.getProperty("innerText")).jsonValue();
      if (text === "Add to Cart") await button.click();
    }

    const cartCount = await page.$eval("#cart-count", (el) => el.innerText);
    expect(cartCount).toBe("20");
  }, 20000);

  it("Checking number of items in cart on screen after reload", async () => {
    await page.reload();
    const prodItems = await page.$$("product-item");
    let allInCart = true;

    for (const item of prodItems) {
      const shadowRoot = await item.getProperty("shadowRoot");
      const button = await shadowRoot.$("button");
      const innerText = await (
        await button.getProperty("innerText")
      ).jsonValue();
      if (innerText !== "Remove from Cart") {
        allInCart = false;
        break;
      }
    }

    const cartCount = await page.$eval("#cart-count", (el) => el.innerText);
    expect(allInCart).toBe(true);
    expect(cartCount).toBe("20");
  }, 15000);

  it("Checking the localStorage to make sure cart is correct", async () => {
    const cart = await page.evaluate(() => localStorage.getItem("cart"));
    expect(cart).toBe("[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]");
  });

  it("Checking number of items in cart on screen after removing from cart", async () => {
    const prodItems = await page.$$("product-item");

    for (const item of prodItems) {
      const shadowRoot = await item.getProperty("shadowRoot");
      const button = await shadowRoot.$("button");
      const text = await (await button.getProperty("innerText")).jsonValue();
      if (text === "Remove from Cart") await button.click();
    }

    const cartCount = await page.$eval("#cart-count", (el) => el.innerText);
    expect(cartCount).toBe("0");
  }, 20000);

  it("Checking number of items in cart on screen after reload", async () => {
    await page.reload();
    const prodItems = await page.$$("product-item");
    let allEmpty = true;

    for (const item of prodItems) {
      const shadowRoot = await item.getProperty("shadowRoot");
      const button = await shadowRoot.$("button");
      const innerText = await (
        await button.getProperty("innerText")
      ).jsonValue();
      if (innerText !== "Add to Cart") {
        allEmpty = false;
        break;
      }
    }

    const cartCount = await page.$eval("#cart-count", (el) => el.innerText);
    expect(allEmpty).toBe(true);
    expect(cartCount).toBe("0");
  }, 15000);

  it("Checking the localStorage to make sure cart is correct", async () => {
    const cart = await page.evaluate(() => localStorage.getItem("cart"));
    expect(cart).toBe("[]");
  });
});
