describe('basket', function () {
  beforeEach(module('basket'));

  var basket;

  beforeEach(inject(function (_basket_) {
    basket = _basket_;
  }));

  it('should add a product into the basket', function () {
    basket.add({ id: 1, name: 'Product' });
    expect(basket.count()).toBe(1);
  });

  it('should add multiple products into the basket', function () {
    basket.add({ id: 1, name: 'Product' });
    basket.add({ id: 2, name: 'Product' });
    basket.add({ id: 3, name: 'Product' });
    expect(basket.count()).toBe(3);
  });

  it('should remove a product from the basket', function () {
    var product = { id: 1, name: 'Product' };
    basket.add(product);
    expect(basket.count()).toBe(1);

    basket.remove(product);
    expect(basket.count()).toBe(0);
  });

  it('should remove a stack of product from the basket', function () {
    var product = { id: 1, name: 'Product' };
    basket.add(product);
    expect(basket.count()).toBe(1);
    basket.add(product);
    expect(basket.count()).toBe(2);
    expect(basket.getProducts().length).toBe(1);

    basket.remove(product);
    expect(basket.count()).toBe(1);
    expect(basket.getProducts().length).toBe(1);
    basket.remove(product);
    expect(basket.count()).toBe(0);
    expect(basket.getProducts().length).toBe(0);
  });

  it('should retrieve all products in the basket', function () {
    basket.add({ id: 1, name: 'Product' });
    expect(basket.getProducts().length).toBe(1);

    basket.add({ id: 2, name: 'Product' });
    expect(basket.getProducts().length).toBe(2);
  });

  it('should compute total value of the basket', function () {
    basket.add({ id: 1, name: 'Product', price: 40 });
    basket.add({ id: 2, name: 'Product', price: 60 });
    expect(basket.getTotal()).toBe(100);
  });

  it('should stack same products', function () {
    basket.add({ id: 1, name: 'Product' });
    basket.add({ id: 1, name: 'Product' });
    expect(basket.count()).toBe(2);
    expect(basket.getProducts().length).toBe(1);

    basket.add({ id: 2, name: 'Product' });
    expect(basket.count()).toBe(3);
    expect(basket.getProducts().length).toBe(2);
  });

  it('should clear the basket', function () {
    basket.add({ id: 1, name: 'Product', price: 40 });
    expect(basket.count()).toBe(1);
    expect(basket.getTotal()).toBe(40);
    expect(basket.getProducts().length).toBe(1);

    basket.clear();
    expect(basket.count()).toBe(0);
    expect(basket.getTotal()).toBe(0);
    expect(basket.getProducts().length).toBe(0);
  });
});
