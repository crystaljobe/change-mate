class IntOrStrConverter:
    regex = '[0-9]+|[a-zA-Z]+'

    def to_python(self, value):
        if value.isdigit():
            return int(value)
        else:
            return str(value)

    def to_url(self, value):
        return str(value)