const request = require('supertest');
const app = require('../index');

const menu = require('../controllers/menuController');

menu.add({ name: 'Marinara', type: 'Pizza' });
menu.add({ name: 'Margarita', type: 'Pizza' });
menu.add({ name: 'Salami', type: 'Pizza' });

describe('Order Endpoints', () => {
  it('should return all orders', async done => {
    const res = await request(app).get('/api/orders');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual([]);
    done();
  });

  it('should create a order', async done => {
    const res = await request(app)
      .post('/api/orders')
      .send({
        customer: {
          name: 'John Doe',
          phone: '1234567889',
          address: 'Du Helder Street, 27'
        },
        items: [
          {
            menuId: 1,
            size: 'small',
            number: 20
          },
          {
            menuId: 2,
            size: 'medium',
            number: 2
          }
        ]
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('code');
    done();
  });

  it('should alter a item in a order', async done => {
    const order = await request(app).get('/api/orders');

    const res = await request(app)
      .put('/api/orders/items')
      .send({
        id: 1,
        size: 'small',
        number: 12,
        menuId: 1,
        orderId: order.body[0].id
      });
    expect(res.statusCode).toEqual(200);
    res.body.ordersList.map(item => {
      if (item.id === 1) {
        expect(item.number).toEqual(12);
        done();
      }
    });
  });

  it('should change the status of the order', async done => {
    const order = await request(app).get('/api/orders');
    const res = await request(app)
      .put('/api/orders/status')
      .send({
        code: order.body[0].code,
        status: 'DELIVERED'
      });
    expect(res.body.status).toEqual('DELIVERED');
    done();
  });

  it('should throw error while trying to alter order delivered', async done => {
    const order = await request(app).get('/api/orders');
    const res = await request(app)
      .put('/api/orders/status')
      .send({
        code: order.body[0].code,
        status: 'PREPARING'
      });
    expect(res.body).toHaveProperty('errorCode');
    done();
  });

  it('should return invalid input error', async done => {
    const res = await request(app).get(`/api/orders/${123187552}`);
    expect(res.body).toHaveProperty('errorCode');
    done();
  });
});
