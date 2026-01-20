import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see private/tmp/hunter-test-module/routes/test-module.php:21
* @route '/test-module/reports/analytics'
*/
export const analytics = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: analytics.url(options),
    method: 'get',
})

analytics.definition = {
    methods: ["get","head"],
    url: '/test-module/reports/analytics',
} satisfies RouteDefinition<["get","head"]>

/**
* @see private/tmp/hunter-test-module/routes/test-module.php:21
* @route '/test-module/reports/analytics'
*/
analytics.url = (options?: RouteQueryOptions) => {
    return analytics.definition.url + queryParams(options)
}

/**
* @see private/tmp/hunter-test-module/routes/test-module.php:21
* @route '/test-module/reports/analytics'
*/
analytics.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: analytics.url(options),
    method: 'get',
})

/**
* @see private/tmp/hunter-test-module/routes/test-module.php:21
* @route '/test-module/reports/analytics'
*/
analytics.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: analytics.url(options),
    method: 'head',
})

/**
* @see private/tmp/hunter-test-module/routes/test-module.php:21
* @route '/test-module/reports/analytics'
*/
const analyticsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: analytics.url(options),
    method: 'get',
})

/**
* @see private/tmp/hunter-test-module/routes/test-module.php:21
* @route '/test-module/reports/analytics'
*/
analyticsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: analytics.url(options),
    method: 'get',
})

/**
* @see private/tmp/hunter-test-module/routes/test-module.php:21
* @route '/test-module/reports/analytics'
*/
analyticsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: analytics.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

analytics.form = analyticsForm

/**
* @see private/tmp/hunter-test-module/routes/test-module.php:22
* @route '/test-module/reports/exports'
*/
export const exports = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exports.url(options),
    method: 'get',
})

exports.definition = {
    methods: ["get","head"],
    url: '/test-module/reports/exports',
} satisfies RouteDefinition<["get","head"]>

/**
* @see private/tmp/hunter-test-module/routes/test-module.php:22
* @route '/test-module/reports/exports'
*/
exports.url = (options?: RouteQueryOptions) => {
    return exports.definition.url + queryParams(options)
}

/**
* @see private/tmp/hunter-test-module/routes/test-module.php:22
* @route '/test-module/reports/exports'
*/
exports.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exports.url(options),
    method: 'get',
})

/**
* @see private/tmp/hunter-test-module/routes/test-module.php:22
* @route '/test-module/reports/exports'
*/
exports.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exports.url(options),
    method: 'head',
})

/**
* @see private/tmp/hunter-test-module/routes/test-module.php:22
* @route '/test-module/reports/exports'
*/
const exportsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: exports.url(options),
    method: 'get',
})

/**
* @see private/tmp/hunter-test-module/routes/test-module.php:22
* @route '/test-module/reports/exports'
*/
exportsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: exports.url(options),
    method: 'get',
})

/**
* @see private/tmp/hunter-test-module/routes/test-module.php:22
* @route '/test-module/reports/exports'
*/
exportsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: exports.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

exports.form = exportsForm

const reports = {
    analytics: Object.assign(analytics, analytics),
    exports: Object.assign(exports, exports),
}

export default reports