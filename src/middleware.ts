export { default } from 'next-auth/middleware'

export const config = {

  matcher: [
    '/nota',
    '/materiaPrima',
    '/salidasMateriasPrimas',
    '/clientes',
    '/ventas',
    '/pedidos',
    '/planilla'
  ]
}
