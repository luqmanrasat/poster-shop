new Vue({
  el: "#app",
  data: {
    total: 0,
    products: [],
    cart: [],
    search: "cat",
    lastSearch: "",
    loading: false,
  },
  methods: {
    addToCart(product) {
      this.total += product.price;
      var found = false;
      for (var i = 0; i < this.cart.length; i++) {
        if (this.cart[i].id === product.id) {
          this.cart[i].qty++;
          found = true;
        }
      }
      if (!found) {
        this.cart.push({
          ...product,
          qty: 1,
        });
      }
    },
    inc(item) {
      item.qty++;
      this.total += item.price;
    },
    dec(item) {
      item.qty--;
      this.total -= item.price;
      if (item.qty <= 0) { 
        var i = this.cart.indexOf(item);
        this.cart.splice(i, 1);
      }
    },
    onSubmit() {
      var path = `/search?q=${this.search}`;
      this.$http.get(path)
        .then((response) => {
          this.products = [];
          this.loading = true;
          this.products = response.body;
          this.lastSearch = this.search;
          this.loading = false;
        });
    },
  },
  filters: {
    currency(price) {
      return `$${price.toFixed(2)}`;
    },
  },

  // Lifecycle Hooks
  created() {
    this.onSubmit();
  },
});