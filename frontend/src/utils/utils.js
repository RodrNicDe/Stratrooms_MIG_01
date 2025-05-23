import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Función de utilidad para combinar condicionalmente nombres de clase CSS.
 * @param {...*} inputs - Una lista de argumentos que pueden ser strings, objetos o arrays de nombres de clase CSS.
 * @returns {string} - Una cadena de nombres de clase CSS combinados.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
