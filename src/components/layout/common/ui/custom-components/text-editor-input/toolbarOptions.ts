export const toolbarOptions = {
    options: ['inline', 'list', 'link', 'history'],
    inline: {
        options: ['bold', 'italic', 'underline', 'strikethrough'],
        bold: {
            icon: './icons/bold.svg',
            title: 'Жирний шрифт',
        },
        italic: {
            icon: ['./icons/italic.svg'],
            title: 'Курсивний шрифт',
        },
        underline: {
            icon: ['./icons/underline.svg'],
            title: 'Підкреслений шрифт',
        },
        strikethrough: {
            icon: ['./icons/strikethrough.svg'],
            title: 'Закреслений шрифт',
        },
    },
    list: {
        options: ['unordered', 'ordered'],
        unordered: {
            icon: './icons/list.svg',
            title: 'Список з колами',
        },
        ordered: {
            icon: './icons/listOrdered.svg',
            title: 'Список з цифрами',
        },
    },
    link: {
        popupClassName: 'your-popup-classname',
    },
};
