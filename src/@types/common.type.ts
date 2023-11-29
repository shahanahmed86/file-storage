export type BaseEnvironment = {
	APP_PROTOCOL: string;
	APP_HOST: string;
	APP_PORT: number;
};

export interface SetupOptions extends BaseEnvironment {
	forceReInstall: boolean;
	skipPrompts: boolean;
	args?: string;
}
