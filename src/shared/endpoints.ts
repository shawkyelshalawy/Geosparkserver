export type EndpointConfig = {
  url: string;
  method: 'patch' | 'get' | 'post' | 'delete';
  auth?: boolean;
  sensitive?: boolean; // Skips logging request body
};

export enum Endpoints {
  healthz = 'healthz',

  signin = 'signin',
  signup = 'signup',
  
}

export function withParams(
  endpoint: EndpointConfig,
  ...params: string[]
): EndpointConfig {
  let url = endpoint.url;
  const placeholders = url.match(/:[^\/]*/g) || [];
  if (placeholders.length !== params.length) {
    throw `Too ${
      placeholders.length < params.length ? 'many' : 'few'
    } params for url: ${url}!`;
  }
  for (let index = 0; index < params.length; index++) {
    url = url.replace(placeholders[index], params[index]);
  }
  return {
    url: url,
    method: endpoint.method,
    auth: endpoint.auth,
  } as EndpointConfig;
}

export const ENDPOINT_CONFIGS: { [key in Endpoints]: EndpointConfig } = {
  [Endpoints.healthz]: { method: 'get', url: '/api/v1/healthz' },

  [Endpoints.signin]: {
    method: 'post',
    url: '/api/v1/signin',
    sensitive: true,
  },
  [Endpoints.signup]: {
    method: 'post',
    url: '/api/v1/signup',
    sensitive: true,
  },
};
