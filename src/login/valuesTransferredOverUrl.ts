import { kcContext } from './kcContext';
import {
    retrieveParamFromUrl,
    updateSearchBarUrl,
} from 'powerhooks/tools/urlSearchParams';

export function read(params: {
    queryParamName: string;
}): string | undefined {
    if (
        kcContext === undefined ||
        process.env.NODE_ENV !== 'production'
    ) {
        //NOTE: We do something only if we are really in Keycloak
        return undefined;
    }

    const { queryParamName } = params;

    read_from_url: {
        const result = retrieveParamFromUrl({
            url: window.location.href,
            name: queryParamName,
        });

        if (!result.wasPresent) {
            break read_from_url;
        }

        const { newUrl, value: serializedValue } = result;

        updateSearchBarUrl(newUrl);

        localStorage.setItem(queryParamName, serializedValue);

        return serializedValue;
    }

    //Reading from local storage
    const serializedValue = localStorage.getItem(queryParamName);

    if (serializedValue === null) {
        throw new Error(
            `Missing ${queryParamName} in URL when redirecting to login page`,
        );
    }

    return serializedValue;
}
