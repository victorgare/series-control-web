/* eslint-disable no-useless-escape */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-undef */
'use strict'
;(function (factory) {
    /*!
     * Custom Universal Module Definition (UMD)
     *
     * Video.js will never be a non-browser lib so we can simplify UMD a bunch and
     * still support requirejs and browserify. This also needs to be closure
     * compiler compatible, so string keys are used.
     */
    if (typeof define === 'function' && define.amd) {
        define(['video.js'], function (vjs) {
            factory(window, document, vjs)
        })
        // checking that module is an object too because of umdjs/umd#35
    } else if (typeof exports === 'object' && typeof module === 'object') {
        factory(window, document, require('video.js'))
    } else {
        factory(window, document, videojs)
    }
})(function (window, document, vjs) {
    // cookie functions from https://developer.mozilla.org/en-US/docs/DOM/document.cookie
    const getCookieItem = function (sKey) {
        if (!sKey || !hasCookieItem(sKey)) {
            return null
        }
        const regex = new RegExp(
            '(?:^|.*;\\s*)' + window.escape(sKey).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*',
        )
        return window.unescape(document.cookie.replace(regex, '$1'))
    }

    const setCookieItem = function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
        if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) {
            return
        }
        let sExpires = ''
        if (vEnd) {
            switch (vEnd.constructor) {
                case Number:
                    sExpires = vEnd === Infinity ? '; expires=Tue, 19 Jan 2038 03:14:07 GMT' : '; max-age=' + vEnd
                    break
                case String:
                    sExpires = '; expires=' + vEnd
                    break
                case Date:
                    sExpires = '; expires=' + vEnd.toGMTString()
                    break
            }
        }
        document.cookie =
            window.escape(sKey) +
            '=' +
            window.escape(sValue) +
            sExpires +
            (sDomain ? '; domain=' + sDomain : '') +
            (sPath ? '; path=' + sPath : '') +
            (bSecure ? '; secure' : '')
    }

    const hasCookieItem = function (sKey) {
        return new RegExp('(?:^|;\\s*)' + window.escape(sKey).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=').test(
            document.cookie,
        )
    }

    const hasLocalStorage = function () {
        try {
            window.localStorage.setItem('persistVolume', 'persistVolume')
            window.localStorage.removeItem('persistVolume')
            return true
        } catch (e) {
            return false
        }
    }
    const getStorageItem = function (key) {
        return hasLocalStorage() ? window.localStorage.getItem(key) : getCookieItem(key)
    }
    const setStorageItem = function (key, value) {
        return hasLocalStorage() ? window.localStorage.setItem(key, value) : setCookieItem(key, value, Infinity, '/')
    }

    const extend = function (obj) {
        let arg, i, k
        for (i = 1; i < arguments.length; i++) {
            arg = arguments[i]
            for (k in arg) {
                if (arg.hasOwnProperty(k)) {
                    obj[k] = arg[k]
                }
            }
        }
        return obj
    }

    const defaults = {
        namespace: '',
    }

    const volumePersister = function (options) {
        const player = this
        const settings = extend({}, defaults, options || {})

        const key = settings.namespace + '-' + 'volume'
        const muteKey = settings.namespace + '-' + 'mute'

        player.on('volumechange', function () {
            setStorageItem(key, player.volume())
            setStorageItem(muteKey, player.muted())
        })

        const persistedVolume = getStorageItem(key)
        if (persistedVolume !== null) {
            player.volume(persistedVolume)
        }

        const persistedMute = getStorageItem(muteKey)
        if (persistedMute !== null) {
            player.muted(persistedMute === 'true')
        }
    }

    vjs.default.plugin('persistvolume', volumePersister)
})
