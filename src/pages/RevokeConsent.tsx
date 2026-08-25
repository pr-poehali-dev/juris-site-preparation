import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

export default function RevokeConsent() {
  return (
    <main className="bg-paper min-h-screen">
      <header className="bg-graphite-900 text-paper-50 py-10">
        <div className="max-w-3xl mx-auto px-6 flex items-center justify-between gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-golos text-xs uppercase tracking-[0.15em] text-graphite-300 hover:text-lime transition-colors"
          >
            <Icon name="ArrowLeft" size={16} />
            На главную
          </Link>
        </div>
      </header>

      <article className="max-w-3xl mx-auto px-6 py-16 md:py-20">
        <h1 className="font-cormorant text-4xl md:text-5xl text-graphite-900 leading-tight tracking-tight">
          Заявление об отзыве согласия на обработку персональных данных
        </h1>
        <p className="font-golos text-sm text-graphite-500 mt-4 leading-relaxed">
          Если вы хотите отозвать ранее данное согласие на обработку персональных данных,
          заполните и отправьте заявление по образцу ниже.
        </p>

        <div className="prose-policy mt-10 space-y-6 font-golos text-[15px] text-graphite-700 leading-relaxed">
          <p>
            Индивидуальному предпринимателю Закарьяевой Патимат Магомедовне<br />
            ОГРНИП: 324508100712587<br />
            ИНН: 056104200127<br />
            адрес: __________________________________
          </p>
          <p>
            от _______________________________________ (Ф.И.О.)<br />
            паспорт: серия ______ №&nbsp;____________,<br />
            выдан _____________________________________<br />
            адрес: ____________________________________<br />
            тел./e-mail: _______________________________
          </p>

          <h2 className="font-cormorant text-2xl text-graphite-900 text-center pt-4">
            ЗАЯВЛЕНИЕ<br />
            <span className="text-lg">об отзыве согласия на обработку персональных данных</span>
          </h2>

          <p>
            На основании части&nbsp;2 статьи&nbsp;9 Федерального закона от&nbsp;27.07.2006
            №&nbsp;152-ФЗ «О&nbsp;персональных данных» отзываю данное мною согласие на&nbsp;обработку
            моих персональных данных, предоставленное «____» ______________ 20___ г. при&nbsp;использовании
            сайта __________________ (нужное указать: при направлении заявки через форму обратной
            связи / при подписке на рассылку / иное: ______________________________).
          </p>
          <p>
            Прошу прекратить обработку моих персональных данных и уничтожить их в срок,
            не превышающий тридцати дней с даты поступления настоящего заявления, за исключением
            случаев, когда обработка может быть продолжена в соответствии с частью&nbsp;2
            статьи&nbsp;9 Закона №&nbsp;152-ФЗ, а также направить мне уведомление о результатах
            рассмотрения настоящего заявления по указанным выше контактным данным.
          </p>
          <p>
            Персональные данные, позволяющие идентифицировать данное мною согласие: фамилия, имя,
            отчество, номер телефона, адрес электронной почты, указанные при заполнении формы
            на сайте.
          </p>

          <p className="pt-4">«____» ______________ 20___ г.</p>
          <p>________________________ / _________________________ /</p>
          <p className="text-xs text-graphite-400">(подпись) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(Ф.И.О.)</p>
        </div>

        <div className="mt-10 pt-8 border-t border-graphite-900/15">
          <p className="font-golos text-sm text-graphite-500 mb-4">
            Заполненное заявление направьте на электронную почту:{" "}
            <a
              href="mailto:zakaraevapatimat6@gmail.com"
              className="text-graphite-900 underline underline-offset-2 hover:text-lime transition-colors"
            >
              zakaraevapatimat6@gmail.com
            </a>
          </p>
        </div>

        <div className="mt-6 pt-8 border-t border-graphite-900/15">
          <Link
            to="/privacy"
            className="inline-flex items-center gap-2 font-golos text-sm uppercase tracking-[0.15em] text-graphite-900 hover:text-lime transition-colors"
          >
            <Icon name="ArrowLeft" size={16} />
            К политике обработки персональных данных
          </Link>
        </div>
      </article>
    </main>
  );
}
