import React, {useState} from "react";


const payments = [
    ["bank_card", "Банковская карта"],
    //["apple_pay", "Apple Pay"],
    //["google_pay", "Google Pay"],
    ["yandex_money", "Яндекс.Деньги"],
    //["qiwi", "QIWI Кошелек"],
    //["webmoney", "Webmoney"],
    //["wechat", "WeChat"],
    //["sberbank", "Сбербанк Онлайн"],
    ["alfabank", "Альфа-Клик"],
    //["tinkoff_bank", "Тинькофф"],
    //["b2b_sberbank", "Сбербанк Бизнес Онлайн"],
    //["mobile_balance", "Баланс телефона"],
    ["cash", "Наличные"],
    //["installments", "Заплатить по частям"],
]
export default function PaymentForm(props) {
    const [error, setError] =useState('');

    function showPayments(e) {
        if (!e.target.value) return;
        props.api(`/payment/create/post/${props.post.id}/tariff/${props.tariff.id}/method/${e.target.value}`)
            .then(data => {
                //console.log(data)
                //const externalWindow = window.open('', '', 'width=600,height=400,left=200,top=200');
                //externalWindow.document.location.href = data.confirmation.confirmation_url;
                document.location.href = data.confirmation.confirmation_url;

            })
            .catch(e=>{
                setError('Ошибка платежной системы')
            })
    }


    return <div>
        <select onChange={showPayments}>
            <option value={0}>Выберите способ оплаты</option>
            {payments.map(p => <option value={p[0]}>{p[1]}</option>)}
        </select>
        <div className="text-danger">{error}</div>
        {/*<Button onClick={test}>Симулировать платеж {props.payment.price} руб</Button>*/}
    </div>
}
