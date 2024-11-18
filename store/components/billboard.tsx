import { Billboard as BillboardType } from '@/types';

interface BillboardProps {
    data: BillboardType;
}

const Billboard: React.FC<BillboardProps> = ({ data }) => {
    return (
        <div className='p-4 overflow-hidden sm:p-6 lg:p-8 rounded-xl'>
            <div className='relative rounded-xl aspect-square md:aspect-[2.4/1] overflow-hidden'>
                {/* Background Image */}
                <div
                    className='absolute inset-0 bg-cover bg-center'
                    style={{ backgroundImage: `url(${data?.imageUrl})` }}
                />
                
                {/* Overlay with reduced opacity */}
                <div className='absolute inset-0 bg-black/60 z-10' /> 

                {/* Content with reduced z-index for the label */}
                <div className='relative z-5 flex flex-col items-center justify-center w-full h-full text-center gap-y-8'>
                    <div className='max-w-xs text-3xl text-white font-bold sm:text-5xl lg:text-7xl sm:max-w-xl'>
                        {data?.label}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Billboard;
