import { getKcContext } from 'keycloakify/login';

export type KcContextExtension = {
    pageId: 'register-user-profile.ftl';
    register: {
        formData: { location: string; occupation: string };
    };
};

/**
    The KcContext type is a generic type that can take an extension parameter to add additional properties to the context object.

    KcContext represents the runtime configuration for the Keycloak server, which is passed to the Keycloak login page and used to customize the login experience.

    The kcContext object is a part of the Keycloak JavaScript adapter, and it is created by calling getKcContext() method provided by keycloakify. It contains various properties and methods that allow the customization of the login page, such as the ability to customize the look and feel, add custom JavaScript code, and customize the behavior of the login page.

    In summary, KcContext is a runtime configuration object that provides customization options for the Keycloak login page.
 */
export const { kcContext } = getKcContext<KcContextExtension>();

export type KcContext = NonNullable<typeof kcContext>;
