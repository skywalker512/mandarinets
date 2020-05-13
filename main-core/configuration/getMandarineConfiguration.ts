import { MandarineProperties, MandarineDefaultConfiguration } from "../../mandarine-properties.ts";

export const getMandarineConfiguration = (configuration?: MandarineProperties) => {
    if (!(window as any).mandarineMVCConfiguration)
    (window as any).mandarineMVCConfiguration = (configuration == (null || undefined)) ? MandarineDefaultConfiguration : configuration;

    return (window as any).mandarineMVCConfiguration;
}