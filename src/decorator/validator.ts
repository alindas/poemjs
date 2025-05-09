import * as validator from 'class-validator'

export function IsNotEmpty(opt?: validator.ValidationOptions): PropertyDecorator {
    opt = opt || { message: '$property 不能为空' }
    return validator.IsNotEmpty(opt)
}

export function IsNumber(_?: validator.IsNumberOptions, opt?: validator.ValidationOptions): PropertyDecorator {
    opt = opt || { message: '$property 必须是数字' }
    return validator.IsNumber(_, opt)
}

export function IsString(opt?: validator.ValidationOptions): PropertyDecorator {
    opt = opt || { message: '$property 必须是字符串' }
    return validator.IsString(opt)
}
