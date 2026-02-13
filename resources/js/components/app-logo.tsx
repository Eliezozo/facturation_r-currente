import AppLogoIcon from './app-logo-icon';

type AppLogoProps = {
    variant?: 'gradient' | 'white';
    sizeClassName?: string;
};

export default function AppLogo({
    variant = 'gradient',
    sizeClassName = 'h-[10rem]',
}: AppLogoProps) {
    return (
        <div className="flex items-center">
            <AppLogoIcon
                variant={variant}
                className={`${sizeClassName} w-auto`}
            />
        </div>
    );
}
