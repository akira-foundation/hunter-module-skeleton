import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
import settings from './settings'
import reports from './reports'
/**
* @see private/tmp/hunter-test-module/routes/test-module.php:11
* @route '/test-module'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/test-module',
} satisfies RouteDefinition<["get","head"]>

/**
* @see private/tmp/hunter-test-module/routes/test-module.php:11
* @route '/test-module'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see private/tmp/hunter-test-module/routes/test-module.php:11
* @route '/test-module'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see private/tmp/hunter-test-module/routes/test-module.php:11
* @route '/test-module'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see private/tmp/hunter-test-module/routes/test-module.php:11
* @route '/test-module'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see private/tmp/hunter-test-module/routes/test-module.php:11
* @route '/test-module'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see private/tmp/hunter-test-module/routes/test-module.php:11
* @route '/test-module'
*/
indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index.form = indexForm

const testModule = {
    index: Object.assign(index, index),
    settings: Object.assign(settings, settings),
    reports: Object.assign(reports, reports),
}

export default testModule