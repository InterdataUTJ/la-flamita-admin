export interface ErrorResponse {
  name: string;
  message: string;
}

interface HttpOptions {
  jwt?: string;
  asForm?: boolean;
}

const ApiServiceError = {
  name: "ApiServiceError",
  message: "Error al realizar la petición al servidor.",
}

export default class Http {

  protected static baseUrl: string = "http://localhost:8000/api";

  static async get<T>(url: string, options: HttpOptions = {}): Promise<T | undefined> {
    return this.noBodyRequest<T>("get", url, options);
  }

  static async delete<T>(url: string, options: HttpOptions = {}): Promise<T | undefined> {
    return this.noBodyRequest<T>("delete", url, options);
  }

  static async post<T>(url: string, body: Object, options: HttpOptions = {}): Promise<T | undefined> {
    return this.bodyRequest<T>("post", url, body, options);
  }

  static async put<T>(url: string, body: Object, options: HttpOptions = {}): Promise<T | undefined> {
    return this.bodyRequest<T>("put", url, body, options);
  }


  private static async noBodyRequest<T>(method: string, url: string, options: HttpOptions = {}): Promise<T | undefined> {
    return new Promise<T | undefined>(async (resolve, reject) => {
      const headers = new Headers();
      if (options.jwt) headers.append("Authorization", `Bearer ${options.jwt}`);

      // Send request
      try {
        const res = await fetch(`${this.baseUrl}${url}`, { method, headers });
        if (!res.ok) return reject(await res.json());
        if (res.headers.get("Content-Type")?.includes("application/json")) return resolve(await res.json());
        resolve(undefined);
      } catch {
        reject(ApiServiceError);
      }
    });
  }

  private static async bodyRequest<T>(method: string, url: string, body: Object, options: HttpOptions = {}): Promise<T | undefined> {
    return new Promise<T | undefined>(async (resolve, reject) => {
      const headers = new Headers();
      const formBody = new FormData();
      if (options.jwt) headers.append("Authorization", `Bearer ${options.jwt}`);
      if (!options.asForm) headers.append("Content-Type", "application/json");
      else {
        headers.append("Content-Type", "application/form-data");
        Object.entries(body).forEach(([key, value]) => formBody.append(key, value));
      }

      // Send request
      try {
        const res = await fetch(`${this.baseUrl}${url}`, { 
          method,  
          headers,
          body: options.asForm ? formBody : JSON.stringify(body),
        });

        if (!res.ok) return reject(await res.json());
        if (res.headers.get("Content-Type")?.includes("application/json")) return resolve(await res.json());
        resolve(undefined);
      } catch {
        reject(ApiServiceError);
      }
    });
  }
  
}