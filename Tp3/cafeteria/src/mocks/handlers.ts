import { http, HttpResponse } from 'msw'
import type { Product } from '../schemas/product'


const mockProducts: Product[] = [
  { id: "1", name: "Cafe", price: 1200 },
  { id: "2", name: "Té", price: 1000 },
];

export const handlers = [
  http.get('/api/menu', () => {
    return HttpResponse.json({
      menu: mockProducts
    })
  }),
]