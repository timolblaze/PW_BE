import { Request } from "express";

export default (originalUrl: string) => {
   return originalUrl.split('/')
}

export function isHome(req: Request) {
   const routes = req.path.split('/').join('')
   if (!routes) return true
   
   return false
}