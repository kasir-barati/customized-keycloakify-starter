import { getKcContext } from 'keycloakify/login';

export type KcContextExtension = {
    pageId: 'register.ftl';
    register: {
        formData: { location: string; occupation: string };
    };
};

export const { kcContext } = getKcContext<KcContextExtension>();

export type KcContext = NonNullable<typeof kcContext>;
