import {HttpMethods} from "../types/http-methods";
import {MyRouter} from "../types/my-router";
import {RestDecoratorInfo} from "../types/rest-decorator";

export function rest(
    httpMethod: HttpMethods,
    path: string
) {
    return (target: MyRouter, propertyName: string): any => {
        const ar: RestDecoratorInfo[] = Reflect.get(target,'_restApiCalls') ?? [];

        ar.push({
            path,
            httpMethod,
            propertyName,
        })

        Reflect.set(target, '_restApiCalls', ar);
    };
}

export function get(path: string) {
    return rest('get', path)
}

export function post(path: string) {
    return rest('post', path)
}


