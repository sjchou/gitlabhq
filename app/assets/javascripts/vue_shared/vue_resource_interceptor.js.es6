/* eslint-disable func-names, prefer-arrow-callback, no-unused-vars,
no-param-reassign, no-plusplus */
/* global Vue */

Vue.http.interceptors.push((request, next) => {
  Vue.activeResources = Vue.activeResources ? Vue.activeResources + 1 : 1;

  next((response) => {
    if (typeof response.data === 'string') {
      response.data = JSON.parse(response.data);
    }

    Vue.activeResources--;
  });
});

Vue.http.interceptors.push((request, next) => {
  // needed in order to not break the tests.
  if ($.rails) {
    request.headers['X-CSRF-Token'] = $.rails.csrfToken();
  }
  next();
});

// TODO - REMOVE THIS WHEN WE HAVE BACKEND API
Vue.http.interceptors.push((request, next) => {
  const deployBoardData = {
    instances: [
      { status: 'finished', tooltip: 'tanuki-2334 Finished' },
      { status: 'finished', tooltip: 'tanuki-2335 Finished' },
      { status: 'finished', tooltip: 'tanuki-2336 Finished' },
      { status: 'finished', tooltip: 'tanuki-2337 Finished' },
      { status: 'finished', tooltip: 'tanuki-2338 Finished' },
      { status: 'finished', tooltip: 'tanuki-2339 Finished' },
      { status: 'finished', tooltip: 'tanuki-2340 Finished' },
      { status: 'finished', tooltip: 'tanuki-2334 Finished' },
      { status: 'finished', tooltip: 'tanuki-2335 Finished' },
      { status: 'finished', tooltip: 'tanuki-2336 Finished' },
      { status: 'finished', tooltip: 'tanuki-2337 Finished' },
      { status: 'finished', tooltip: 'tanuki-2338 Finished' },
      { status: 'finished', tooltip: 'tanuki-2339 Finished' },
      { status: 'finished', tooltip: 'tanuki-2340 Finished' },
      { status: 'finished', tooltip: 'tanuki-2334 Finished' },
      { status: 'finished', tooltip: 'tanuki-2335 Finished' },
      { status: 'finished', tooltip: 'tanuki-2336 Finished' },
      { status: 'finished', tooltip: 'tanuki-2337 Finished' },
      { status: 'finished', tooltip: 'tanuki-2338 Finished' },
      { status: 'finished', tooltip: 'tanuki-2339 Finished' },
      { status: 'finished', tooltip: 'tanuki-2340 Finished' },
      { status: 'finished', tooltip: 'tanuki-2334 Finished' },
      { status: 'finished', tooltip: 'tanuki-2335 Finished' },
      { status: 'finished', tooltip: 'tanuki-2336 Finished' },
      { status: 'finished', tooltip: 'tanuki-2337 Finished' },
      { status: 'finished', tooltip: 'tanuki-2338 Finished' },
      { status: 'finished', tooltip: 'tanuki-2339 Finished' },
      { status: 'finished', tooltip: 'tanuki-2340 Finished' },
      { status: 'finished', tooltip: 'tanuki-2334 Finished' },
      { status: 'finished', tooltip: 'tanuki-2335 Finished' },
      { status: 'finished', tooltip: 'tanuki-2336 Finished' },
      { status: 'finished', tooltip: 'tanuki-2337 Finished' },
      { status: 'finished', tooltip: 'tanuki-2338 Finished' },
      { status: 'finished', tooltip: 'tanuki-2339 Finished' },
      { status: 'finished', tooltip: 'tanuki-2340 Finished' },
      { status: 'finished', tooltip: 'tanuki-2334 Finished' },
      { status: 'finished', tooltip: 'tanuki-2335 Finished' },
      { status: 'finished', tooltip: 'tanuki-2336 Finished' },
      { status: 'finished', tooltip: 'tanuki-2337 Finished' },
      { status: 'finished', tooltip: 'tanuki-2338 Finished' },
      { status: 'finished', tooltip: 'tanuki-2339 Finished' },
      { status: 'finished', tooltip: 'tanuki-2340 Finished' },
      { status: 'deploying', tooltip: 'tanuki-2341 Deploying' },
      { status: 'deploying', tooltip: 'tanuki-2342 Deploying' },
      { status: 'deploying', tooltip: 'tanuki-2343 Deploying' },
      { status: 'failed', tooltip: 'tanuki-2344 Failed' },
      { status: 'ready', tooltip: 'tanuki-2345 Ready' },
      { status: 'ready', tooltip: 'tanuki-2346 Ready' },
      { status: 'ready', tooltip: 'tanuki-2347 Ready' },
      { status: 'preparing', tooltip: 'tanuki-2348 Preparing' },
      { status: 'preparing', tooltip: 'tanuki-2349 Preparing' },
      { status: 'preparing', tooltip: 'tanuki-2350 Preparing' },
      { status: 'preparing', tooltip: 'tanuki-2351 Preparing' },
      { status: 'preparing', tooltip: 'tanuki-2352 Preparing' },
      { status: 'preparing', tooltip: 'tanuki-2353 Preparing' },
      { status: 'waiting', tooltip: 'tanuki-2354 Waiting' },
      { status: 'waiting', tooltip: 'tanuki-2355 Waiting' },
      { status: 'waiting', tooltip: 'tanuki-2356 Waiting' },
      { status: 'waiting', tooltip: 'tanuki-2357 Waiting' },
      { status: 'waiting', tooltip: 'tanuki-2358 Waiting' },
      { status: 'waiting', tooltip: 'tanuki-2359 Waiting' },
    ],
    abort_url: '',
    rollback_url: '',
    completion: 87,
    is_completed: true,
  };

  if (request.url === 'environments/{id}/status.json') {
    next(request.respondWith(JSON.stringify(deployBoardData), {
      status: 200,
    }));
  }

  next();
});
