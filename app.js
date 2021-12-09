new Vue({
    el: 'body',
    data: {
      originalCollateral : 20,
      originalPrice : 4350,
      currentCollateral : 42.99,
      currentPrice : 4400,
      currentDebt : 100005,
      currentEma : 3708,
      maxBorrow : 0.8,
      repayRatio : 1.25,
      boostAmount : 0,
      newCollateral : 0,
      newDebt : 0,
      profit : 0
    },
    mounted: function() {
      this.calculate();
    },
    methods: {
      calculate: function() {
        
        // (debt * repayRatio) / (collateral * maxBorrow) = currentEma
        // Below calculates additional boost amount by adding to the debt and collateral
        // ((debt + (x * price)) * repayRatio) / ((collateral + x) * maxBorrow) = currentEma
        var a = this.repayRatio * this.currentDebt;
        var b = this.repayRatio * this.currentPrice;
        var c = parseFloat(this.currentEma * this.maxBorrow);
        var d = c * parseFloat(this.currentCollateral);
        var e = b - c;
        var f = d - a;
  
        this.boostAmount = f / e;
  
        this.newCollateral = parseFloat(this.currentCollateral + this.boostAmount);
        this.newDebt = parseFloat(this.currentDebt) + parseFloat(this.boostAmount * this.currentPrice);
        this.profit = (this.newCollateral * this.currentPrice) - (this.originalCollateral * this.originalPrice) - this.newDebt;
      }
    }
  });

  Vue.filter('toFixed', function (value, precision) {
    precision = precision | 2;
    var parts = value.toFixed(precision).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",").split(".");
    var part1 = parts[0].replace(/(d)(?=(ddd)+(?!d))/g, "$1,");
    var part2 = parts[1];
    return part1 + '.' + part2;
  });