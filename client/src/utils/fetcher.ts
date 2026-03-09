export const fetcher = async<T> (
  url: string,
  method: string = 'GET', 
  data?:unknown
):Promise<T> => {
  const token = localStorage.getItem('jwt');

  const headers: Record<string, string> = {
    'Content-Type': 'application/json'
  }

  const options: RequestInit = {
    method,
    headers
  }

  if(token){
    headers['Authorization'] = `Bearer ${token}`
  }

  if(data) {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, options);

    if(!response.ok){
      const error = await response.json();
      throw new Error(`Response status: ${response.status}, ${error.message}`)
    }

    const result = await response.json();

    return result as T;


  } catch (error) {
    if(error instanceof Error){
      throw error
    }
    throw new Error('An unknown error occurred.')
  }
  
}

export const API = { 
  get<T>(url: string): Promise<T>{
    return fetcher(url)
  },
  post<T>(url: string, data: unknown): Promise<T>{
    return fetcher(url, 'POST', data)
  },
  patch<T>(url: string, data: unknown): Promise<T>{
    return fetcher(url, 'PATCH', data)
  },
  put<T>(url: string, data: unknown): Promise<T>{
    return fetcher(url, 'PUT', data)
  },
  delete<T>(url: string): Promise<T>{
    return fetcher(url, 'DELETE')
  }
}