import { getToken } from '../../services/auth/token';
// import i18n from 'i18n';

type Options = {
  isAuth?: boolean;
  token?: string;
};

/* eslint-disable  no-console */
const genRequestOptions = (
  method: string,
  body: Record<string, any> | undefined | null,
  options: Options = {}
) => {
  let parsedBody;
  // const languageKey = i18n.language;

  const { isAuth, token } = options;

  try {
    if (body) {
      parsedBody = JSON.stringify(body);
    } else {
      parsedBody = null;
    }
  } catch (e) {
    throw new Error(`body for send to api isn't valid json`);
  }

  const headers: {
    'Content-Type'?: string;
    Authorization?: string;
  } = isAuth
    ? {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Bearer ${token || getToken() || ''}`,
        // 'x-localization': languageKey,
      }
    : {
        'Content-Type': 'application/json; charset=utf-8',
        // 'x-localization': languageKey,
      };

  if (method === 'GET' || method === 'DELETE') {
    delete headers['Content-Type'];
  }
  return {
    method,
    headers,
    body: method === 'GET' || method === 'DELETE' ? null : parsedBody,
  };
};

const handleSuccess = (response: Response) =>
  response.json().then((body) => {
    if (Array.isArray(body)) {
      return {
        data: body,
        response,
      };
    } else {
      return {
        ...body,
        response,
      };
    }
  });

const handleFail = (response: Response) =>
  response.json().then((body) => {
    if (Array.isArray(body)) {
      return {
        data: body,
        response,
      };
    } else {
      return {
        ...body,
        response,
      };
    }
  });

const handleResponse = (response: Response) => {
  if (response.ok) {
    return handleSuccess(response);
  }
  return handleFail(response).then((error) => {
    throw error;
  });
};

export const fetchGet = (
  url: string,
  params?: Record<string, any>,
  options?: Options
) => {
  let urlParams: string | URL = url;
  try {
    urlParams = new URL(url);
    Object.keys(params || {}).forEach((key) =>
      (urlParams as URL).searchParams.append(key, params?.[key])
    );
  } catch (e) {
    console.warn('Url is invalid');
  }

  const requestOptions = genRequestOptions('GET', null, options);
  return fetch(
    urlParams as string,
    requestOptions as RequestInit | undefined
  ).then(handleResponse);
};

export const fetchPost = (
  url: string,
  body?: Record<string, any>,
  options?: Options
) => {
  const requestOptions = genRequestOptions('POST', body, options);
  return fetch(url, requestOptions as RequestInit | undefined).then(
    handleResponse
  );
};

export const fetchPut = (
  url: string,
  body?: Record<string, any>,
  options?: Options
) => {
  const requestOptions = genRequestOptions('PUT', body, options);
  return fetch(url, requestOptions as RequestInit | undefined).then(
    handleResponse
  );
};

export const fetchDelete = (
  url: string,
  params?: Record<string, any>,
  options?: Options
) => {
  let urlParams: string | URL = url;
  try {
    urlParams = new URL(url);
    Object.keys(params || {}).forEach((key) =>
      (urlParams as URL).searchParams.append(key, params?.[key])
    );
  } catch (e) {
    console.warn('Url is invalid');
  }

  const requestOptions = genRequestOptions('DELETE', null, options);
  return fetch(
    urlParams as string,
    requestOptions as RequestInit | undefined
  ).then(handleResponse);
};

export const fetchPostFormData = (
  url: string,
  body?: Record<string, any>,
  isAuth = false
) => {
  const payload = new FormData();

  if (body) {
    Object.keys(body).forEach((key) => {
      payload.append(key, body[key]);
    });
  }

  const requestOptions = {
    method: 'POST',
    body: payload,
    headers: isAuth
      ? {
          Authorization: `${getToken() || ''}`,
        }
      : undefined,
  };
  return fetch(url, requestOptions).then(handleResponse);
};
