const tailwindcss = require ('tailwindcss')

module.exports = {
    Plugins:[
        tailwindcss('./taildwind.config.js'),
        require ('autoprefixer')
    ]
}