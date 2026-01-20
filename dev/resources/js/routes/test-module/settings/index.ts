import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see private/tmp/hunter-test-module/routes/test-module.php:15
* @route '/test-module/settings/general'
*/
export const general = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: general.url(options),
    method: 'get',
})

general.definition = {
    methods: ["get","head"],
    url: '/test-module/settings/general',
} satisfies RouteDefinition<["get","head"]>

/**
* @see private/tmp/hunter-test-module/routes/test-module.php:15
* @route '/test-module/settings/general'
*/
general.url = (options?: RouteQueryOptions) => {
    return general.definition.url + queryParams(options)
}

/**
* @see private/tmp/hunter-test-module/routes/test-module.php:15
* @route '/test-module/settings/general'
*/
general.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: general.url(options),
    method: 'get',
})

/**
* @see private/tmp/hunter-test-module/routes/test-module.php:15
* @route '/test-module/settings/general'
*/
general.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: general.url(options),
    method: 'head',
})

/**
* @see private/tmp/hunter-test-module/routes/test-module.php:15
* @route '/test-module/settings/general'
*/
const generalForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: general.url(options),
    method: 'get',
})

/**
* @see private/tmp/hunter-test-module/routes/test-module.php:15
* @route '/test-module/settings/general'
*/
generalForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: general.url(options),
    method: 'get',
})

/**
* @see private/tmp/hunter-test-module/routes/test-module.php:15
* @route '/test-module/settings/general'
*/
generalForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: general.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

general.form = generalForm

/**
* @see private/tmp/hunter-test-module/routes/test-module.php:16
* @route '/test-module/settings/advanced'
*/
export const advanced = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: advanced.url(options),
    method: 'get',
})

advanced.definition = {
    methods: ["get","head"],
    url: '/test-module/settings/advanced',
} satisfies RouteDefinition<["get","head"]>

/**
* @see private/tmp/hunter-test-module/routes/test-module.php:16
* @route '/test-module/settings/advanced'
*/
advanced.url = (options?: RouteQueryOptions) => {
    return advanced.definition.url + queryParams(options)
}

/**
* @see private/tmp/hunter-test-module/routes/test-module.php:16
* @route '/test-module/settings/advanced'
*/
advanced.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: advanced.url(options),
    method: 'get',
})

/**
* @see private/tmp/hunter-test-module/routes/test-module.php:16
* @route '/test-module/settings/advanced'
*/
advanced.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: advanced.url(options),
    method: 'head',
})

/**
* @see private/tmp/hunter-test-module/routes/test-module.php:16
* @route '/test-module/settings/advanced'
*/
const advancedForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: advanced.url(options),
    method: 'get',
})

/**
* @see private/tmp/hunter-test-module/routes/test-module.php:16
* @route '/test-module/settings/advanced'
*/
advancedForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: advanced.url(options),
    method: 'get',
})

/**
* @see private/tmp/hunter-test-module/routes/test-module.php:16
* @route '/test-module/settings/advanced'
*/
advancedForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: advanced.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

advanced.form = advancedForm

const settings = {
    general: Object.assign(general, general),
    advanced: Object.assign(advanced, advanced),
}

export default settings