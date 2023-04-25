import { getWixClient } from '@app/hooks/useWixClientServer';
import { WixMediaImage } from '@app/components/Image/WixMediaImage';

export default async function Project({ params }: any) {
  const wixClient = await getWixClient();
  const { items } = await wixClient.dataItems
    .queryDataItems({
      dataCollectionId: 'Our-Projects',
    })
    .eq('slug', params.slug)
    .find();
  const project = items![0];

  return (
    <div className="relative">
      <div className="w-full h-[400px] relative">
        <WixMediaImage
          media={project.data!.cover}
          alt={project.data!.title}
          objectFit="cover"
          disableZoom={true}
        />
      </div>
      <div className="max-w-7xl mx-auto mt-[-120px] relative bg-white px-8 sm:px-20 text-center">
        <h1 className="py-8 font-site">{project.data!.title}</h1>
        <p className="pt-6 max-w-3xl text-sm mx-auto">
          {project.data!.short_description}
        </p>
        <p className="py-6 max-w-3xl text-sm mx-auto">
          {project.data!.long_description}
        </p>
        <a href="" className="btn-main">
          Donate
        </a>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 grid-flow-row mt-10">
          {project.data!.gallery?.map((image: any, i: number) => (
            <div key={i} className="p-4 relative">
              <WixMediaImage media={image.src} width={500} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}