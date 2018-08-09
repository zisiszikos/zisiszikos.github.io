/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [
    ['android-icon-144x144.png', 'b4938944c88bc7ffa534a085a71a4744'],
    ['android-icon-192x192.png', '0f7465d4ca4789d2690219611169e062'],
    ['android-icon-36x36.png', 'd3b3a0af6c7d814149e9f9578a028e45'],
    ['android-icon-48x48.png', '19d8513fd5f828c351723a9f459a1c8c'],
    ['android-icon-72x72.png', '9f578382234a880fcb69d93c0429f36b'],
    ['android-icon-96x96.png', '4ee3380061a4c11f2c82a59e4cf1e7a3'],
    ['apple-icon-114x114.png', 'd9e6191b7d3b15628cbe5a0e2cdc1faa'],
    ['apple-icon-120x120.png', '0ee85a4fcce5431d97ed80763c3ba283'],
    ['apple-icon-144x144.png', 'b4938944c88bc7ffa534a085a71a4744'],
    ['apple-icon-152x152.png', '472f9e585998d433a0159109640521e1'],
    ['apple-icon-180x180.png', '82716a3aa27fa660eee684de9c7d3c8f'],
    ['apple-icon-57x57.png', 'c9092d750f4edb0bef46b2ad85130895'],
    ['apple-icon-60x60.png', '9795b3443bf7f99ff20348e29e98e4b7'],
    ['apple-icon-72x72.png', '9f578382234a880fcb69d93c0429f36b'],
    ['apple-icon-76x76.png', '9b9804d2f7017b4929770034b983a4d5'],
    ['apple-icon-precomposed.png', 'cd67ff656b1a6c7acb89ccd1a6cbfaf9'],
    ['apple-icon.png', 'cd67ff656b1a6c7acb89ccd1a6cbfaf9'],
    ['browserconfig.xml', '653d077300a12f09a69caeea7a8947f8'],
    ['css/fontawesome-all.min.css', '42eaa52604673b64d6b356c2fd7f87e3'],
    ['css/normalize.css', '8c6eee6b2107ef25dc486020ced13898'],
    ['favicon-16x16.png', 'b6a5ae243c79fbe1c9312cb2eb521080'],
    ['favicon-32x32.png', '984ffae35926997aa65f4ce6900150ef'],
    ['favicon-96x96.png', '4ee3380061a4c11f2c82a59e4cf1e7a3'],
    ['favicon.ico', '3ab7681379e5c848e119c25605d750c1'],
    ['images/back.jpg', '29ce50ab9609d4ca1d2dd6278051352e'],
    ['images/zisis_zikos.jpg', '2a58679be93e505f056bfcf163e06b62'],
    ['index.html', '14bcaba172efe302d98b8b35da472e47'],
    ['js/service-worker-registration.js', 'aae801816075a11d9f3132b2ce60a404'],
    ['manifest.json', 'ca27828efabda010c76337c8850380ec'],
    ['ms-icon-144x144.png', 'b4938944c88bc7ffa534a085a71a4744'],
    ['ms-icon-150x150.png', '75d0989202c0e3a19e9588944e98fe73'],
    ['ms-icon-310x310.png', '1a73e515b8fc0effdf281ae285c1a010'],
    ['ms-icon-70x70.png', 'df13ad52f9c29f5256d039e03e5a34e5'],
    ['style.css', '2632262c9d68ccf0b69eb37b1a9005c7'],
    ['webfonts/fa-brands-400.eot', 'ae37590ab05e9c625bcabf1759ab9dc2'],
    ['webfonts/fa-brands-400.svg', 'fb0cbe85f42e49383ac4764fd3211e66'],
    ['webfonts/fa-brands-400.ttf', 'c09b5960237e462582aa7b66411e57d5'],
    ['webfonts/fa-brands-400.woff', 'b5f5ef6112d693b968ad9d1646eea529'],
    ['webfonts/fa-brands-400.woff2', 'c971847be1cd6c17abca74025b4f36ae'],
    ['webfonts/fa-regular-400.eot', 'd7de79cae74b02f2d377786656f1d816'],
    ['webfonts/fa-regular-400.svg', 'c15c758e798dd295b471b69ac409ef02'],
    ['webfonts/fa-regular-400.ttf', '6bad016cd4efb36aa82618f55f0f660d'],
    ['webfonts/fa-regular-400.woff', '562010a46ef5216ac76a08c2ceb99985'],
    ['webfonts/fa-regular-400.woff2', '032ba2e0f134a35ed87df1564936d352'],
    ['webfonts/fa-solid-900.eot', '10c304f14cd2f6b6bed2ae7f574f03af'],
    ['webfonts/fa-solid-900.svg', '9948e588ad4ca0db716da1c4d57f900e'],
    ['webfonts/fa-solid-900.ttf', '3f07fd745b951055c656cf27db9a31d5'],
    ['webfonts/fa-solid-900.woff', 'c9a328cc89d13b8959e710d82b4b40d1'],
    ['webfonts/fa-solid-900.woff2', 'f9b85c9463af7103b9b24bbbf09a06ed']
];
var cacheName = 'sw-precache-v3-sw-precache-' + (self.registration ? self.registration.scope : '');

var ignoreUrlParametersMatching = [/^utm_/];

var addDirectoryIndex = function(originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
        url.pathname += index;
    }
    return url.toString();
};

var cleanResponse = function(originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
        return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ? Promise.resolve(originalResponse.body) : originalResponse.blob();

    return bodyPromise.then(function(body) {
        // new Response() is happy when passed either a stream or a Blob.
        return new Response(body, {
            headers: originalResponse.headers,
            status: originalResponse.status,
            statusText: originalResponse.statusText
        });
    });
};

var createCacheKey = function(originalUrl, paramName, paramValue, dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching || !url.pathname.match(dontCacheBustUrlsMatching)) {
        url.search += (url.search ? '&' : '') + encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
};

var isPathWhitelisted = function(whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
        return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = new URL(absoluteUrlString).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
        return path.match(whitelistedPathRegex);
    });
};

var stripIgnoredUrlParameters = function(originalUrl, ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search
        .slice(1) // Exclude initial '?'
        .split('&') // Split into an array of 'key=value' strings
        .map(function(kv) {
            return kv.split('='); // Split each 'key=value' string into a [key, value] array
        })
        .filter(function(kv) {
            return ignoreUrlParametersMatching.every(function(ignoredRegex) {
                return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
            });
        })
        .map(function(kv) {
            return kv.join('='); // Join each [key, value] array into a 'key=value' string
        })
        .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
};

var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
    precacheConfig.map(function(item) {
        var relativeUrl = item[0];
        var hash = item[1];
        var absoluteUrl = new URL(relativeUrl, self.location);
        var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
        return [absoluteUrl.toString(), cacheKey];
    })
);

function setOfCachedUrls(cache) {
    return cache
        .keys()
        .then(function(requests) {
            return requests.map(function(request) {
                return request.url;
            });
        })
        .then(function(urls) {
            return new Set(urls);
        });
}

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches
            .open(cacheName)
            .then(function(cache) {
                return setOfCachedUrls(cache).then(function(cachedUrls) {
                    return Promise.all(
                        Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
                            // If we don't have a key matching url in the cache already, add it.
                            if (!cachedUrls.has(cacheKey)) {
                                var request = new Request(cacheKey, { credentials: 'same-origin' });
                                return fetch(request).then(function(response) {
                                    // Bail out of installation unless we get back a 200 OK for
                                    // every request.
                                    if (!response.ok) {
                                        throw new Error(
                                            'Request for ' +
                                                cacheKey +
                                                ' returned a ' +
                                                'response with status ' +
                                                response.status
                                        );
                                    }

                                    return cleanResponse(response).then(function(responseToCache) {
                                        return cache.put(cacheKey, responseToCache);
                                    });
                                });
                            }
                        })
                    );
                });
            })
            .then(function() {
                // Force the SW to transition from installing -> active state
                return self.skipWaiting();
            })
    );
});

self.addEventListener('activate', function(event) {
    var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

    event.waitUntil(
        caches
            .open(cacheName)
            .then(function(cache) {
                return cache.keys().then(function(existingRequests) {
                    return Promise.all(
                        existingRequests.map(function(existingRequest) {
                            if (!setOfExpectedUrls.has(existingRequest.url)) {
                                return cache.delete(existingRequest);
                            }
                        })
                    );
                });
            })
            .then(function() {
                return self.clients.claim();
            })
    );
});

self.addEventListener('fetch', function(event) {
    if (event.request.method === 'GET') {
        // Should we call event.respondWith() inside this fetch event handler?
        // This needs to be determined synchronously, which will give other fetch
        // handlers a chance to handle the request if need be.
        var shouldRespond;

        // First, remove all the ignored parameters and hash fragment, and see if we
        // have that URL in our cache. If so, great! shouldRespond will be true.
        var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
        shouldRespond = urlsToCacheKeys.has(url);

        // If shouldRespond is false, check again, this time with 'index.html'
        // (or whatever the directoryIndex option is set to) at the end.
        var directoryIndex = 'index.html';
        if (!shouldRespond && directoryIndex) {
            url = addDirectoryIndex(url, directoryIndex);
            shouldRespond = urlsToCacheKeys.has(url);
        }

        // If shouldRespond is still false, check to see if this is a navigation
        // request, and if so, whether the URL matches navigateFallbackWhitelist.
        var navigateFallback = '';
        if (
            !shouldRespond &&
            navigateFallback &&
            event.request.mode === 'navigate' &&
            isPathWhitelisted([], event.request.url)
        ) {
            url = new URL(navigateFallback, self.location).toString();
            shouldRespond = urlsToCacheKeys.has(url);
        }

        // If shouldRespond was set to true at any point, then call
        // event.respondWith(), using the appropriate cache key.
        if (shouldRespond) {
            event.respondWith(
                caches
                    .open(cacheName)
                    .then(function(cache) {
                        return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
                            if (response) {
                                return response;
                            }
                            throw Error('The cached response that was expected is missing.');
                        });
                    })
                    .catch(function(e) {
                        // Fall back to just fetch()ing the request if some unexpected error
                        // prevented the cached response from being valid.
                        console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
                        return fetch(event.request);
                    })
            );
        }
    }
});
