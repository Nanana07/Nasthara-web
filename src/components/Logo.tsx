import Image from 'next/image';
import type { FC } from 'react';

export const Logo: FC<{ className?: string, style?: React.CSSProperties }> = ({ className, style }) => (
    <Image src="/Nasthara.png" alt="Nasthara Logo" width={32} height={32} className={className} style={style} />
);