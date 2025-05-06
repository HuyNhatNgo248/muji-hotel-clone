import { Params } from '@/types'
import { getDictionary } from '../dictionaries'

export default async function Page({ params }: Params) {
  const { lang } = await params

  const dictionary = await getDictionary(lang)

  return (
    <div className="py-container-sm">
      <div className="mx-auto lg:w-[60%] w-[90%]">
        <h2 className="text-4xl font-semibold mb-16 capitalize">
          {dictionary['location']['location']}
        </h2>

        <div className="relative w-full lg:h-[600px] md:h-[450px] min-h-[300px]">
          <iframe
            src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3241.153656787006!2d139.76279277559212!3d35.67321833041447!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188b29bbb7da51%3A0x9e6617b5ac45b83b!2sMuji%20Hotel%20Ginza!5e0!3m2!1sen!2sjp!4v1746501773404!5m2!1sen!2sjp&hl=${lang}`}
            className="absolute top-0 left-0 w-full h-full border-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Muji Ginza Hotel Map"
          />
        </div>
      </div>
    </div>
  )
}
