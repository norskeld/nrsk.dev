---
title: How to Cancel HTTP Requests in React using Axios
description: Introduction Axios is an amazing library for fetching...
createdAt: 2023-01-22
updatedAt: 2023-03-12
tags:
  - react
  - axios
  - http-client
---

# Introduction

Axios is an amazing library for fetching and processing HTTP requests and sometimes comes in handy to use a cancel feature in specific situations.

# The problem we want to solve

For me, I struggled with a function that gets products by their categories, and these categories are just mapped into a scrolling pane where the user can click any category and the products view will update according to a new HTTP request that fetches these products by the category id. the problem is shown when the user clicks a category and the HTTP request gets pending due to a slow internet connection then while this request is pending the user attempt to click another category and another HTTP request is fired to get a different product from a different category. while the previous category products are still pending and the current category is still pending too, the products view will get updated only from the first request that gets resolved, which means that a wired behavior will happen to the products view because for one second the products view will show the wrong products for the current category and when the proper request is resolved the products view will be updated with the correct category clicked previously.

so this behavior is not likable in such practices where the user can play around and click whatever he wants from the categories pane. so the HTTP request should be handled properly to prevent any data leak or data conflicts between categories and products.

# The solution

Fortunately, Axios came out of the box with so many features, and this feature is called Cancellation which is built upon fetch API.

so for me, I have this function which gets products:

```js
const getProducts = async (id, scrolling) => {
  const limit = 25
  let url

  if (id === 'ALL') {
    if (preferences?.store?.id === 'ALL' || preferences?.store?.id === undefined) {
      url = `/pos/items?Limit=${limit}&currencyId=${currencyId}&offset=${
        scrolling ? items.length : 0
      }`
    } else {
      url = `/pos/items?Limit=${limit}&currencyId=${currencyId}&storeId=${
        preferences?.store?.id
      }&groupId=${id}&offset=${scrolling ? items.length : 0}`
    }
  }
  let cacheKey = `${url}_${id}`
  if (cache.current[cacheKey]) {
    setLoading(false)
    return setProducts(cache.current[cacheKey])
  } else {
    try {
      const { data } = await Axios.get(url)
      if (data) {
        setLoading(false)
        setHasMore(data.length >= 25)
        setProducts(scrolling ? [...items, ...data] : data)
        cache.current[cacheKey] = scrolling ? [...items, ...data] : data
      }
    } catch (e) {
      if (axios.isCancel(e)) {
        console.log(e)
      } else {
        setError(true)
        toast.error(e.message)
        setLoading(false)
      }
    }
  }
}
```

so this the function that's gets fired when a category is clicked and it gets fired as long the user keeps clicking on categories, we want to make this function only fires once and cancel the previous request.

What we will do is declare a variable a the top of our main code called controller that will be as a token for each request we fire.

```js
const controller = new AbortController()
```

and we will modify the axios.get call to be like this:

```js
const { data } = await Axios.get(url, {
  signal: controller.signal
})
```

and the final function would be like this:

```js
const getProducts = async (id, scrolling) => {
  if (controller) {
    controller.abort()
  }
  const limit = 25
  let url

  if (id === 'ALL') {
    if (preferences?.store?.id === 'ALL' || preferences?.store?.id === undefined) {
      url = `/pos/items?Limit=${limit}&currencyId=${currencyId}&offset=${
        scrolling ? items.length : 0
      }`
    } else {
      url = `/pos/items?Limit=${limit}&currencyId=${currencyId}&storeId=${
        preferences?.store?.id
      }&groupId=${id}&offset=${scrolling ? items.length : 0}`
    }
  }
  let cacheKey = `${url}_${id}`
  if (cache.current[cacheKey]) {
    setLoading(false)
    return setProducts(cache.current[cacheKey])
  } else {
    try {
      const { data } = await Axios.get(url)
      if (data) {
        setLoading(false)
        setHasMore(data.length >= 25)
        setProducts(scrolling ? [...items, ...data] : data)
        cache.current[cacheKey] = scrolling ? [...items, ...data] : data
      }
    } catch (e) {
      if (axios.isCancel(e)) {
        console.log(e)
      } else {
        setError(true)
        toast.error(e.message)
        setLoading(false)
      }
    }
  }
}
```

So now whenever this function gets called twice, it will cancel the previous request and process the later (current) request only.

![image](https://cdn.hashnode.com/res/hashnode/image/upload/v1655291347326/rDpwetZhe.png?auto=compress,format&format=webp)

It is a handy feature that benefits us in many different ways, first, we saved our backend from too many requests (not likable, also not performant choice), secondly, we kept our UI delivering concise data without any conflicts or data-leak.

this also can be used in a search function where you want to cancel previous queries and handle only the last query entered by the end-user.

# References:

- axios-http.com/docs/cancellation
