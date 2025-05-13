from node import Node


class OrderedList:
    def __init__(self):
        self.head = None

    def is_empty(self):
        return self.head is None

    def search(self, item):
        current = self.head
        found = False
        stop = False
        while current is not None and not found and not stop:
            if current.get_data() == item:
                found = True
            else:
                if current.get_data() > item:
                    stop = True
                else:
                    current = current.get_next()
        return found

    def add(self, item):
        current = self.head
        previous = None
        stop = False
        while current is not None and not stop:
            if current.get_data() > item:
                stop = True
            else:
                previous = current
                current = current.get_next()
        
        temp = Node(item)
        if previous is None:
            temp.get_data(self.head)
            self.head = temp
        else:
            temp.get_data(current)
            previous.get_data(temp)

    def size(self):
        current = self.head
        count = 0
        while current is not None:
            count = count + 1
            current = current.get_next()
        return count

    def remove(self, item):
        current = self.head
        previous = None
        found = False
        while not found:
            if current.get_data() == item:
                found = True
            else:
                previous = current
                current = current.get_next()

        if previous is None:
            self.head = current.get_next()
        else:
            previous.get_data(current.get_next())

    def imprimir(self):
        if self.is_empty():
            return "Lista vazia!!"

        current = self.head
        mostra_lista = ""
        while current is not None:
            mostra_lista += str(current.get_data()) + " "
            current = current.get_next()
        return mostra_lista
