export const toolbarOptions = {
    options: ['inline', 'fontSize', 'list', 'link', 'history'],
    inline: {
        options: [
            'bold',
            'italic',
            'underline',
            'strikethrough',
            'superscript',
            'subscript',
        ],
        bold: {
            icon: '../icons/bold.svg',
            title: 'Жирний шрифт',
        },
        italic: {
            icon: ['../icons/italic.svg'],
            title: 'Курсивний шрифт',
        },
        underline: {
            icon: ['../icons/underline.svg'],
            title: 'Підкреслений шрифт',
        },
        strikethrough: {
            icon: ['../icons/strikethrough.svg'],
            title: 'Закреслений шрифт',
        },
        superscript: {
            icon: '../icons/superscript.svg',
            title: 'Верхній індекс',
        },
        subscript: {
            icon: '../icons/subscript.svg',
            title: 'Нижній індекс',
        },
    },
    fontSize: {
        icon: ['./icons/fontSize.svg'],
        options: [8, 9, 10, 11, 12, 14, 16, 18, 24, 30],
    },
    list: {
        options: ['unordered', 'ordered'],
        unordered: {
            icon: '../icons/list.svg',
            title: 'Список з колами',
        },
        ordered: {
            icon: '../icons/listOrdered.svg',
            title: 'Список з цифрами',
        },
    },
    link: {
        popupClassName: 'your-popup-classname',
    },
};
